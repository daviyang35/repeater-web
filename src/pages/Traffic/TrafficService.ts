import request from "@/utils/request";

const delRecord = (id: number): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.delete("/online/" + id).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};


const TrafficService = {
    delRecord,
};
export default TrafficService;
