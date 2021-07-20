// Angular Modules
import { Injectable } from '@angular/core';
// Application Classes
import { UrlBuilder } from '../../shared/classes/url-builder';
import { QueryStringParameters } from '../../shared/classes/query-string-parameters';
// Application Constants
import { Constants } from 'src/app/config/constants';

@Injectable()
// Returns the api endpoints urls to use in services in a consistent way
export class ApiEndpointsService {

  constructor(
    // Application Constants
    private constants: Constants
  ) { }

  /* #region EXAMPLES */

  public getListUrl = () => this.createUrl('list', this.constants.USE_MOCK_API);
  public getListUrlByIdEndpoint = (id : string) : string => this.createUrlWithPathVariables('list', [id], this.constants.USE_MOCK_API );
  public getItemUrlByListIdAndListItemIdEndpoint = (listId : string, itemId: string) : string => this.createUrlWithPathVariables('list', [listId, itemId], this.constants.USE_MOCK_API );




  /* #region URL CREATOR */
  // URL
  private createUrl(action: string, isMockAPI: boolean = false): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this.constants.API_MOCK_ENDPOINT : this.constants.API_ENDPOINT,
      action
    );
    return urlBuilder.toString();
  }

  // URL WITH QUERY PARAMS
  private createUrlWithQueryParameters(action: string, queryStringHandler?: (queryStringParameters: QueryStringParameters) => void): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(this.constants.API_ENDPOINT, action);
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // URL WITH PATH VARIABLES
  private createUrlWithPathVariables(action: string, pathVariables: any[] = [], isMockApi?: boolean): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl += `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder( isMockApi? this.constants.API_MOCK_ENDPOINT : this.constants.API_ENDPOINT, `${action}${encodedPathVariablesUrl}`);
    return urlBuilder.toString();
  }
}
