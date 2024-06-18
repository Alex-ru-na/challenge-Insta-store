import moment, {
  DurationInputArg1,
  DurationInputArg2,
} from "moment-timezone";

export class MomentAdapter {
  public date(): Date {
    return moment().locale("es").toDate();
  }

  public createUnix(
    { date, format, utc }: { date: string, format: string, utc?: string },
  ): number {
    return utc
      ? moment(date, format).utcOffset(utc).unix()
      : moment(date, format).unix()
  }

  public getTimeUnixSubstract(
    amount: DurationInputArg1, unitTime: DurationInputArg2
  ): number {
    return moment().locale("es").subtract(amount, unitTime).unix();
  }

  public dateUnix(utc?: string): number {
    if (!utc) {
      return moment().unix();
    }
    return moment().utcOffset(utc).unix();
  }

  public createFormatFromUnix(date: number, inputFormat: string): string {
    return moment(date).locale("es").format(inputFormat);
  }
}