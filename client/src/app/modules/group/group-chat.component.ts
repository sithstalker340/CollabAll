import { Component, group } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as io from 'socket.io-client';

import { GroupService, UserService } from '../../shared';

@Component({
    selector: 'group-chat',
    templateUrl: './group-chat.component.html',
    styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent {
    url = 'http://localhost:8080';
    socket = null;

    user = this.userService.getAuthenticatedUser();

    group = {};
    groupID = 0;
    groupUsers = [];
    groupCards = [];
    groupInterjections = [];

    messages = [];
    currentCommunicator = {};
    currentCard = {};

    communicateInterjection = {
        Title: "Communicating!",
        Icon: "fa fa-microphone",
        BackgroundColor: "#449d44",
        TextColor: "#ffffff"
    };

    chatMessage = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupService: GroupService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.groupID = this.route.snapshot.params['id'];

        this.groupService.getGroupMembers(this.groupID)
            .subscribe(
                data => {
                    this.groupUsers = data.users;
                    this.groupUsers.sort(this.compare);

                    this.groupService.getGroupById(this.groupID)
                        .subscribe(
                            data => {
                                this.group = data.group;
                            },
                            err => {
                                console.log(err);
                            }
                        );

                    this.groupService.getCardsForGroup(this.groupID)
                        .subscribe(
                            data => {
                                this.groupCards = data.cards;
                            },
                            err => {
                                console.log(err);
                            }
                        );

                    this.groupService.getInterjectionsForGroup(this.groupID)
                        .subscribe(
                            data => {
                                this.groupInterjections = data.interjections;
                                this.groupInterjections.splice(0, 0, this.communicateInterjection);

                                for (let i = 0; i < this.groupInterjections.length; i++) {
                                    this.groupInterjections[i].Icon = this.groupInterjections[i].Icon.substring(6);
                                }
                            },
                            err => {
                                console.log(err);
                            }
                        );
                },
                err => {
                    console.log(err);
                }
            );

        this.socket = io(this.url, { query: this.user.ID });

        this.socket.on('connect', (msg) => {
            this.socket.emit('join', this.user.ID);
        });

        this.socket.emit('subscribe', { group: this.groupID });
    }

    ngOnDestroy() {
        this.socket.emit('unsubscribe', { group: this.groupID });
    }

    appendChat(message) {
        this.messages.push(message);

        if (message.body.includes === undefined && message.body.Title === 'Communicating!') {
            this.currentCommunicator = message.user;
        }

        if (message.body.includes !== undefined && message.body.includes('Discussing:')) {
            this.currentCard = message.body.replace('Discussing:', '');
        }
    }

    issueInterjection(interjection) {
        let action = {
            body: interjection,
            user: this.user.FirstName + ' ' + this.user.LastName,
            userAvatar: this.user.Avatar,
            groupID: this.groupID
        };

        this.appendChat(action);
    }

    sendMessage() {
        let action = {
            body: this.chatMessage,
            user: this.user.FirstName + ' ' + this.user.LastName,
            userAvatar: this.user.Avatar,
            groupID: this.groupID
        };

        this.appendChat(action);
        this.chatMessage = '';
    }

    communicate() {
        let action = {
            body: 'Communicating!',
            user: this.user.FirstName + ' ' + this.user.LastName,
            userAvatar: this.user.Avatar,
            groupID: this.groupID
        };

        this.appendChat(action);
    }

    discuss(cardID) {
        let result = this.groupCards.find((d) => {
            return d.ID === cardID;
        });

        let action = {
            body: 'Discussing: ' + result.Title,
            user: this.user.FirstName + ' ' + this.user.LastName,
            userAvatar: this.user.Avatar,
            groupID: this.groupID
        };

        this.appendChat(action);
    }

    interject(id) {
        let result = '';

        switch (id) {
            case '1':
                result = 'Slow Down!';
                break;
            case '2':
                result = 'Question!';
                break;
            case '3':
                result = 'Repeat!';
                break;
            case '4':
                result = 'Don\'t Understand!';
                break;
        }

        let action = {
            body: result,
            user: this.user.FirstName + ' ' + this.user.LastName,
            userAvatar: this.user.Avatar,
            groupID: this.groupID
        };

        this.appendChat(action);
    }

    compare(a, b) {
        if (a.FirstName < b.FirstName) {
            return -1;
        }

        if (a.FirstName > b.FirstName) {
            return 1;
        }

        return 0;
    }

    doesItStartWith(string, substring) {
        if (typeof string !== 'string') {
            return false;
        }

        return (string.indexOf(substring) > -1);
    }
}
