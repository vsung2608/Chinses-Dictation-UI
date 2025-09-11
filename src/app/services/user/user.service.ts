import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataPaged } from '../../models/Data';
import { UserResponse } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_API_URL = 'http://localhost:8080/api/v1/admin/profiles';

  params: HttpParams = new HttpParams().set('page', 1).set('size', 10);

  constructor(private httpClient: HttpClient) { }

  getUserPaged(page: number, size: number){
    if(page != null && size != null){
      this.params = new HttpParams().set('page', page).set('size', size);
    }
    return this.httpClient.get<DataPaged<UserResponse>>(this.USER_API_URL, { params: this.params });
  }

  blockUser(id: number){
    return this.httpClient.patch(`${this.USER_API_URL}/block/${id}`, {})
  }

  unblockUser(id: number){
    return this.httpClient.patch(`${this.USER_API_URL}/un-block/${id}`, {})
  }
}
