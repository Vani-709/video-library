import { GA4React } from "ga-4-react";
import ReactGA from 'react-ga';

const ga4react = new GA4React("G-video-library-f5803").initialize();


const events = ReactGA.initialize("G-video-library-f5803")


const trackPathForAnalytics = async () => {
    // const { path, search, title } = data;
    const events = await ReactGA.initialize("G-video-library-f5803")

    await ReactGA.event({
        category: 'Promotion',
        action: 'Displayed Promotional Widget',
        label: 'Homepage Thing',
        nonInteraction: true
      })
};

export default trackPathForAnalytics;