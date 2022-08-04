import { Component, OnInit } from '@angular/core';
import { IonItemSliding, NavController } from '@ionic/angular';
import {Task} from "./task";

@Component({
  selector: 'app-takslist',
  templateUrl: './takslist.page.html',
  styleUrls: ['./takslist.page.scss'],
})
export class TakslistPage implements OnInit {
   tasks: Array<Task> = []
  constructor(public nacCtrl: NavController) { 
    this.tasks=[
      { 
        title: 'Hacer la taeria de ionic',
        status: "Open",
        id: "1"
      },
      {
        title: 'Revisar conexión serial con el controlador',
        status: "Open",
        id: "2"
      },
      {
        title: 'Verificar las trayectorias en el robot',
        status: "Open",
        id: "3"
      }
    ]
  }

  ngOnInit() {
  }

  onAddItem(){
    
    let theNewTask: string = prompt("New Task");
    if (theNewTask !== ""){
       
      this.tasks.push(
        { title:theNewTask , 
          status: 'open',
          id: (this.tasks.length + 1) + "" 
        }
        );
    }
  }
  removeTask(slidingItem: IonItemSliding,task: Task){
    task.status = "removed";
    let index = this.tasks.indexOf(task);
    if (index > -1){
        this.tasks.splice(index,1);
    }
    setTimeout(()=> {slidingItem.close(); },1);
  }
  
  markAsDone(slidingItem: IonItemSliding,task: Task){
    task.status = "done";
    setTimeout(()=> {slidingItem.close(); },1);
  }

}
