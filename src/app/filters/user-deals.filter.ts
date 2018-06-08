import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userDeals'
})

export class UserDealsFilter implements PipeTransform {

    transform(values: any, term: any): any {
        //console.log(values,'val', term)
        if(values === undefined) return values;
        if(term.includes('confirmed')){
            return values.filter(value => {
                return (value.dealStatus.confirmed)
            })
        } else if(term.includes('denied')) {
            return values.filter(value => {
                return (value.dealStatus.denied)
            })
        } else if(term.includes('waiting')) {
            return values.filter(value => {
                return (!value.dealStatus.denied && !value.dealStatus.confirmed)
            })
        }
    }

}