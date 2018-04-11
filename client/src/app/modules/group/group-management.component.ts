import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GroupService } from '../../shared';

@Component({
    selector: 'group-management',
    templateUrl: './group-management.component.html',
    styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupService: GroupService
    ) { }

    ngOnInit() {

    }
}
