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
                        let groups = data.groups;
                        groups.sort(this.compare);

                        this.rows = Math.ceil(groups.length / 4);

                        for (let i = 0; i < groups.length; i += 4) {
                            this.groupSplices.push(groups.slice(i, i + 4));
                        }
                    }
                },
                err => {
                    console.log(err);
                }
            );
    }

    compare(a, b) {
        if (a.group.Name < b.group.Name) {
            return -1;
        }

        if (a.group.Name > b.group.Name) {
            return 1;
        }

        return 0;
    }
}
