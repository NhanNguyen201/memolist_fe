import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';


export default function timeFromNow(createdAt) {
    const locale = {
        name: 'vi',
        relativeTime: {
            future: '%s from now',
            past: '%s ago',
            s: 'few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'a hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years'
        }
    }
    dayjs.locale(locale, null, true)
    dayjs.extend(relativeTime);
    let now = dayjs();
    let ago = dayjs(createdAt)
    if(now.diff(ago, 'hour') > 24) {
        return dayjs(createdAt).format('HH:mm:ss DD/MM/YYYY')
    } else {
        return dayjs(createdAt).fromNow()
    }
}
