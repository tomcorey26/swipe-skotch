import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (
      key: string,
      trackingId: string,
      config: { page_path: string }
    ) => void;
  }
}

export const useTracking = (
  trackingId: string | undefined = process.env.REACT_APP_GA_MEASUREMENT_ID
) => {
  console.log(trackingId, 'in use tracking ');
  const { listen } = useHistory();

  useEffect(() => {
    //This function returns a function that allows us
    // to un listen to the router change
    const unlisten = listen((location) => {
      console.log(trackingId, 'listen called');
      if (!window.gtag) return;
      if (!trackingId) {
        console.log(
          'Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`.'
        );
        return;
      }

      let path = location.pathname;
      path.toLowerCase();
      path = '/' + path.split('/')[0];

      window.gtag('config', trackingId, { page_path: location.pathname });
    });

    return unlisten;
  }, [trackingId, listen]);
};
