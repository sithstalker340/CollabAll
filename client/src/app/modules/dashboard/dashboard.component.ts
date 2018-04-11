import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GroupService } from '../../shared/services/group.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    groupSplices = [];
    rows = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupService: GroupService
    ) { }

    ngOnInit() {
        this.groupService.getUserGroups()
            .subscribe(
                data => {
                    if (data.success) {
                        this.rows = Math.ceil(data.groups.length / 4);

                        for (let i = 0; i < data.groups.length; i += 4) {
                            this.groupSplices.push(data.groups.slice(i, i + 4));
                        }
                    }
                },
                err => {
                    console.log(err);
                }
            );
    }
}
