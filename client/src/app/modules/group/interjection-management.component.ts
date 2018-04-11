import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GroupService, UserService } from '../../shared';

@Component({
    selector: 'interjection-management',
    templateUrl: './interjection-management.component.html',
    styleUrls: ['./interjection-management.component.css']
})
export class InterjectionManagementComponent {
    user = this.userService.getAuthenticatedUser();
    group = {};
    groupID = 0;
    interjectionID = '';
    interjectionTitle = '';
    interjectionDescription = '';
    interjectionIcon = '';
    interjectionColor = '';
    interjectionCaptionist = false;
    interjectionInterpreter = false;
    interjectionPosition = '';
    nonInput = {
        interjectionBackgroundColor: '#333333',
        interjectionTextColor: '#ffffff'
    };
    validation = [];

    title = '';
    alert = {
        message: '',
        success: false,
        failure: false
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupService: GroupService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.groupID = this.route.snapshot.params['id'];
        this.interjectionID = this.route.snapshot.params['interjectionID'];

        if (this.interjectionID === '') {
            this.title = 'Creating a New Interjection';
        } else {
            this.title = 'Managing the Interjection';

            this.groupService.getInterjectionByID(this.interjectionID)
                .subscribe(
                    data => {
                        this.interjectionID = data.interjection.ID;
                        this.interjectionTitle = data.interjection.Title;
                        this.interjectionDescription = data.interjection.Description;
                        this.interjectionIcon = data.interjection.Icon.substring(6);
                        this.interjectionCaptionist = data.interjection.IncludeCaptionist;
                        this.interjectionInterpreter = data.interjection.IncludeInterpreter;
                        this.interjectionPosition = data.interjection.Position;
                        this.nonInput.interjectionBackgroundColor = data.interjection.BackgroundColor;
                        this.nonInput.interjectionTextColor = data.interjection.TextColor;
                    },
                    err => {
                        console.log(err);
                    }
                );
        }

        this.groupService.getGroupById(this.groupID)
            .subscribe(
                data => {
                    this.group = data.group;
                },
                err => {
                    console.log(err);
                }
            );
    }

    saveInterjection() {
        if (this.interjectionID !== '') {
            this.groupService.updateInterjection({
                GroupId: this.groupID,
                GroupInterjectionId: this.interjectionID,
                InterjectionTitle: this.interjectionTitle,
                InterjectionDescription: this.interjectionDescription,
                InterjectionIcon: this.interjectionIcon,
                InterjectionBackgroundColor: this.nonInput.interjectionBackgroundColor,
                InterjectionTextColor: this.nonInput.interjectionTextColor,
                InterjectionCaptionist: this.interjectionCaptionist,
                InterjectionInterpreter: this.interjectionInterpreter,
                InterjectionPosition: this.interjectionPosition
            })
                .subscribe(
                    data => {
                        if (data.success) {
                            this.alert.message = 'Your interjection has been updated! Redirecting you to the group interjections in few seconds...';

                            setTimeout((router: Router) => {
                                this.router.navigate(['/', 'group', this.groupID, 'interjections']);
                            }, 3000);

                            this.alert.success = true;
                            this.alert.failure = false;
                        } else {
                            this.alert.message = 'Your interjection was not updated...';

                            this.alert.success = false;
                            this.alert.failure = true;
                        }
                    },
                    err => {
                        console.log(err);
                    }
                );
        } else {
            this.groupService.createInterjection({
                GroupId: this.groupID,
                InterjectionTitle: this.interjectionTitle,
                InterjectionDescription: this.interjectionDescription,
                InterjectionIcon: this.interjectionIcon,
                InterjectionBackgroundColor: this.nonInput.interjectionBackgroundColor,
                InterjectionTextColor: this.nonInput.interjectionTextColor,
                InterjectionCaptionist: this.interjectionCaptionist,
                InterjectionInterpreter: this.interjectionInterpreter,
                InterjectionPosition: this.interjectionPosition
            })
                .subscribe(
                    data => {
                        if (data.success) {
                            this.alert.message = 'Your interjection has been created! Redirecting you to the group interjections in few seconds...';

                            setTimeout((router: Router) => {
                                this.router.navigate(['/', 'group', this.groupID, 'interjections']);
                            }, 3000);

                            this.alert.success = true;
                            this.alert.failure = false;
                        } else {
                            this.alert.message = 'Your interjection was not created...';

                            this.alert.success = false;
                            this.alert.failure = true;
                        }
                    },
                    err => {
                        console.log(err);
                    }
                );
        }
    }
}
