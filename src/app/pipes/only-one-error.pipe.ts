import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'onlyOneError'
})
export class OnlyOneErrorPipe implements PipeTransform {
    transform(allErrors: any, errorsPriority: any[]) {
        if (!allErrors) {
            return null;
        }

        const onlyOneError: any = {}

        for (let error of errorsPriority) {
            if (allErrors[error]) {
                console.log(allErrors);
                onlyOneError[error] = allErrors[error];
                break;
            }
        }

        return onlyOneError;
    }

}