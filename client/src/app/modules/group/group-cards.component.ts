import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GroupService } from '../../shared';

@Component({
    selector: 'group-cards',
    templateUrl: './group-cards.component.html',
    styleUrls: ['./group-cards.component.css']
})
export class GroupCardsComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupService: GroupService
    ) { }

    ngOnInit() {

    }
}
