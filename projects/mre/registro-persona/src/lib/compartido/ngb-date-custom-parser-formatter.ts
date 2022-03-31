import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

// Formatea el número a 2 lugares
function formatearNumero(valor: number | null) {
    if (!isNaN(valor) && valor !== null) {
        const valorTexto = valor.toString();
        const resultado = valorTexto.length === 1 ? `0${valorTexto}` : valorTexto;
        return resultado;
    } else {
        return '';
    }
}

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {

    parse(value: string): NgbDateStruct | null {
        if (value) {
            const dateParts = value.trim().split('/');

            let dateObj: NgbDateStruct = { day: <any>null, month: <any>null, year: <any>null }
            const dateLabels = Object.keys(dateObj);

            dateParts.forEach((datePart, idx) => {
                dateObj[dateLabels[idx]] = parseInt(datePart, 10) || <any>null;
            });
            return dateObj;
        }
        return null;
    }

    format(date: NgbDateStruct | null): string {
        const resultado = date ? `${formatearNumero(date.day)}/${formatearNumero(date.month)}/${date.year}` : '';
        return resultado;
    }


}