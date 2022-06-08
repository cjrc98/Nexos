import { FirebaseAnalytics } from '@awesome-cordova-plugins/firebase-analytics/ngx';


export class AnalyticsService {

    constructor(private firebaseAnalytics: FirebaseAnalytics) { 

        this.firebaseAnalytics.logEvent('page_view', {page: "dashboard"})
        .then((res: any) => console.log(res))
        .catch((error: any) => console.error(error));
    }

}