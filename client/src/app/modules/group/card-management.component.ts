import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GroupService } from '../../shared';

@Component({
    selector: 'card-management',
    templateUrl: './card-management.component.html',
    styleUrls: ['./card-management.component.css']
})
export class CardManagementComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupService: GroupService
    ) { }

    ngOnInit() {

    }
}
