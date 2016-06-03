export default class FileService {
    /* @ngInject */
    constructor($window, $q) {
        this.$window = $window;
        this.$q = $q;
    }
    
    write(data, fileName, mimeType) {
        let link = "data:" + mimeType + "charset=utf-8," + escape(data);
        this.$window.open(link);
    }
    
    read(file) {
        let deferred = this.$q.defer();
        let reader = new FileReader();
        reader.onload = () => {
            deferred.resolve(reader.result);
        };
        reader.readAsText(file);
        return deferred.promise;
    }
}