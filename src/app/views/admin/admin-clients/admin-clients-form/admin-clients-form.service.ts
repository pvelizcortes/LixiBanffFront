import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../../../constants/global-constants';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client } from '../../../../shared/client';

@Injectable({
  providedIn: 'root'
})
export class AdminClientsFormService {
  private readonly sessionEndpoint = `${GlobalConstants.baseApiUrl}/api/client`;
  constructor(private http: HttpClient) { }

  getControlSummary(query: Client) {
    console.log(query);
    //   const params = {
    //     branchId: JSON.stringify(query.branchId),
    //     department: query.department,
    //     employeeId: query.employeeId.toString(),
    //     profitCenterId: query.profitCenterId.toString(),
    //     from: query.from.toISOString(),
    //     to: query.to.toISOString()
    //   };

    //   return this.http.get<CasinoControlSummaryItem[]>(`${this.sessionEndpoint}/GetAllControlCasino`, { params })
    //     .pipe(
    //       map(toCamel)
    //     );
  }
}
