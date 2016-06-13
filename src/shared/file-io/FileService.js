import { saveAs } from 'file-saver/FileSaver';

export
default class FileService {
    /* @ngInject */
    constructor($window, $q) {
        this.$window = $window;
        this.$q = $q;
    }

    write(data, fileName, mimeType) {
        // Save the specified data to file.
        let blob = new Blob([data], {
            type: mimeType
        });
        saveAs(blob, fileName);
    }

    read(file) {
        // Loading is asynchronous, so we create a promise to return
        // to the caller.
        let deferred = this.$q.defer();
        let reader = new FileReader();
        reader.onload = () => {
            deferred.resolve(reader.result);
        };
        reader.readAsText(file);
        return deferred.promise;
    }
}