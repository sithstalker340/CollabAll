import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GroupService } from '../../shared';

@Component({
    selector: 'interjection-management',
    templateUrl: './interjection-management.component.html',
    styleUrls: ['./interjection-management.component.css']
})
export class InterjectionManagementComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupService: GroupService
    ) { }

    ngOnInit() {

    }
}
