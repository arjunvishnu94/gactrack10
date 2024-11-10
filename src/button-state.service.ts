// button-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ButtonStateService {
    private buttonEnabledSubject = new BehaviorSubject<boolean>(false);
    buttonEnabled$ = this.buttonEnabledSubject.asObservable();

    setButtonEnabled(enabled: boolean) {
        this.buttonEnabledSubject.next(enabled);
    }
}
