import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {noop, of} from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, Validator {

  @Input()
  requiredFileType: string;

  fileName = '';

  fileUploadError = false;

  fileUploadSuccess = false;

  uploadProgress: number;

  onChange = (fileName: string) => {};

  onTouched = () => {};

  onValidatorChange = () => {};

  disabled: boolean = false;

  constructor(private http: HttpClient) {

  }

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      console.log(this.fileName);

      this.fileUploadError = false;

      const formData = new FormData();
      formData.append("thumbnail", file);
      this.http.post("/api/thumbnail-upload", formData, {reportProgress: true, observe: 'events'})
      .pipe(
        catchError(error => {
        this.fileUploadError=true;
        return of(error);
      }),
      finalize(()=> {
        this.uploadProgress = null;
      })).subscribe( event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        } else if (event.type == HttpEventType.Response) {
          this.fileUploadSuccess = true;
          this.onChange(this.fileName);
          this.onValidatorChange();
        }
      });
    }
  }

  writeValue(value: any): void {
    this.fileName = value;
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = this.disabled;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors {
    if (this.fileUploadSuccess) {
      return null;
    }

    let errors : any = {
      requiredFileType: this.requiredFileType
    }

    if (this.fileUploadError) {
      errors.uploadFailed=true;
    }

    return errors;
  }

  registerOnValidatorChange?(onValidatorChange: () => void): void {
    this.onValidatorChange = onValidatorChange;
  }
}
