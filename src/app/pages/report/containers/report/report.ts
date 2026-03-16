import { Component, signal } from '@angular/core';
import { LeafletMap } from '../../../../shared/leaflet-map/leaflet-map';
import { LeafletMouseEvent } from 'leaflet';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { reportData } from '../../models/reportModel';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-report',
  imports: [LeafletMap, ReactiveFormsModule, FormField],
  templateUrl: './report.html',
  styleUrl: './report.scss',
})
export class Report {
  selectedFiles = signal<File[] | []>([]);

  reportModel = signal<reportData>({
    type: '',
    description: '',
  });

  reportForm = form(this.reportModel, (schemaPath) => {
    required(schemaPath.type, { message: 'Type of issue is required' });
    required(schemaPath.description, { message: 'Description is required' });
    minLength(schemaPath.description, 10, { message: 'Description must be atleast 10 chars long' });
  });

  onMapClick(event: LeafletMouseEvent) {
    console.log(event);
  }

  onFileSelected(event: any) {
    const file = event.target.files;
    console.log(event.target.files.length);
    if (file) {
      this.selectedFiles.update((prev) => [...prev, ...event.target.files]);
      console.log(this.selectedFiles());
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('type', this.reportForm.type().value());
    formData.append('description', this.reportForm.description().value());

    // const file = this.selectedFile();
    // if (file) {
    //   formData.append('imageUrls', file, file.name);
    // }
  }

  getPreview(file: File) {
    return URL.createObjectURL(file);
  }

  removeFile(index: number) {
    this.selectedFiles.update((files) => files.filter((el, i) => i !== index));
  }
}
