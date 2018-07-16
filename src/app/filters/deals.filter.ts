import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'deals'
})

export class DealsFilter implements PipeTransform {

    transform(values: any, term: any): any {
        if(values === undefined) return values;
        return values.filter(value => {
            return (value.deal.dealsLeft > 0);
        })
    }

}