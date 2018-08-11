import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { HappyMessage } from '../models/happy-message';
import { IHappyMessage } from '../models/i-happy-message';

@Component({
  selector: 'happy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  happyMessages$: Observable<IHappyMessage[]>;

  constructor(private db: AngularFirestore) {
    this.happyMessages$ = this.db
      .collection<IHappyMessage>('happy-messages')
      .valueChanges();
  }

  ngOnInit() {}

  addHappyMessage(messageInput: HTMLInputElement): void {
    const happyMessage: IHappyMessage = new HappyMessage();
    happyMessage.id = this.db.createId();
    happyMessage.message = messageInput.value;
    this.db
      .collection<IHappyMessage>('happy-messages')
      .add({ ...happyMessage });
    messageInput.value = '';
  }
}
