function timeAgo(date){
    const now=new Date();
    const past=new Date(date)
    const diffInSeconds=Math.floor((now-past)/1000);
    if (diffInSeconds<60) {
        return `${diffInSeconds} seconds ago`
    }
    const minutes=Math.floor(diffInSeconds/60);
    if (minutes<60) {
        if (minutes===1) {
            return `${minutes} minute ago`
        }
        return `${minutes} minutes ago`
    }
    const hours=Math.floor(minutes/60);
    if (hours<24) {
        if (hours===1) {
            return `${hours} hour ago`
        }
        return `${hours} hours ago`
       
    }
    const days= Math.floor(hours/24);
    if (days<30) {
        if (days===1) {
            return `${days} day ago`
        }
        return `${days} days ago`
    }
    const months=Math.floor(days/30);
    if (months<12) {
        if (months===1) {
            return `${months} month ago`
        }
        return `${months} months ago`
    }
    const years=Math.floor(months/12);
    if (years===1) {
        return `${years} year ago`
    }
    return `${years} years ago`

}

export default timeAgo