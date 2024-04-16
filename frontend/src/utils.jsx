export const baseUrl = 'http://localhost:8080/'

export const formatTime = (ts) => {
    if(!ts) return;
    const d = new Date(Number(ts));
    const result = d.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
     });
    var res = result + ", " + String(d).slice(0,15);
    return res;
}