import { Component, OnInit } from '@angular/core';
import { IonItemSliding, NavController } from '@ionic/angular';

// import { AngularFirestore } from '@angular/fire';
import {Task} from "./task";
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-takslist',
  templateUrl: './takslist.page.html',
  styleUrls: ['./takslist.page.scss'],
})
export class TakslistPage implements OnInit {

  tasks = getObservable(this.store.collection('tasks')) as Observable<Task[]>;
  inProgress = getObservable(this.store.collection('inProgress')) as Observable<Task[]>;
  done = getObservable(this.store.collection('done')) as Observable<Task[]>;


  //  tasks: Array<Task> = []
  constructor(public nacCtrl: NavController,
    private store: AngularFirestore
    ) {
    // this.tasks=[
    //   {
    //     title: 'Hacer la taeria de ionic',
    //     status: "Open",
    //     id: "1"
    //   },
    //   {
    //     title: 'Revisar conexión serial con el controlador',
    //     status: "Open",
    //     id: "2"
    //   },
    //   {
    //     title: 'Verificar las trayectorias en el robot',
    //     status: "Open",
    //     id: "3"
    //   }
    // ]
  }

  ngOnInit() {
  }

  onAddItem(){

    let theNewTask: string = prompt("New Task");
    if (theNewTask !== ""){

      let newTask: Task = {} as Task;
      newTask.title = theNewTask;
      newTask.status = "Open";
      this.store.collection('tasks').add(newTask);
    }
  }
  removeTask(slidingItem: IonItemSliding,task: Task){
    task.status = "removed";
    // let index = this.tasks.indexOf(task);
    // if (index > -1){
    //     this.tasks.splice(index,1);
    // }
    setTimeout(()=> {slidingItem.close(); },1);
  }

  markAsDone(slidingItem: IonItemSliding,task: Task){
    task.status = "done";
    setTimeout(()=> {slidingItem.close(); },1);
  }


}
