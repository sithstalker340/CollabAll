import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GroupService } from '../../shared';

@Component({
    selector: 'group-interjections',
    templateUrl: './group-interjections.component.html',
    styleUrls: ['./group-interjections.component.css']
})
export class GroupInterjectionsComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupService: GroupService
    ) { }

    ngOnInit() {

    }
}
