import { Component, OnInit } from '@angular/core';
import { DonorAreaGroupService } from '../../services/donor-area-group.service';

@Component({
  selector: 'app-donor-group-tables',
  templateUrl: './donor-group-tables.component.html',
  styleUrls: ['./donor-group-tables.component.scss']
})
export class DonorGroupTablesComponent implements OnInit {

  donorAreaGroups: { area: number, group: number, donors: any[] }[] = [];

  constructor(
    private donorAreaGroupService: DonorAreaGroupService
    ) {}

  ngOnInit() {
    // Fetch the donor data from the API
    this.donorAreaGroupService.getDonorsAreaGroup()
      .subscribe(data => {
        this.donorAreaGroups = this.groupDonorsByAreaAndGroup(data);
      });
  }

  private groupDonorsByAreaAndGroup(donors: any[]): { area: number, group: number, donors: any[] }[] {
    const areaGroupMap = new Map<string, { area: number, group: number, donors: any[] }>();

    donors.forEach(donor => {
      const key = `${donor.area}_${donor.group}`;
      if (areaGroupMap.has(key)) {
        const group = areaGroupMap.get(key);
        if (group) {
          group.donors.push(donor);
        }
      } else {
        areaGroupMap.set(key, { area: donor.area, group: donor.group, donors: [donor] });
      }
    });

    return Array.from(areaGroupMap.values());
  }

  getTotalPromisedAmount(donors: any[]): number {
    return donors.reduce((total, donor) => total + Number(donor.promised_amount), 0);
  }

  getTotalIncome(donors: any[]): number {
    return donors.reduce((total, donor) => total + Number(donor.total_actual_income), 0);
  }

  getTotalDifference(donors: any[]): number {
    return donors.reduce((total, donor) => total + Number(donor.difference), 0);
  }

}

