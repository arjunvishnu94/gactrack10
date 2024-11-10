
import{BehaviorSubject,Subject} from "rxjs";



export class SharedDataService{

constructor(){}

public editDataDetails:any=[];
public subject = new Subject<any>();
private messageSource = new BehaviorSubject(this.editDataDetails);
currentMessage=this.messageSource.asObservable();
changeMessage(message:string){

    this.messageSource.next(message)
}

}