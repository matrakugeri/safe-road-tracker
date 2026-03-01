import { Component, signal } from '@angular/core';
import { LeafletMap } from '../../../../shared/leaflet-map/leaflet-map';
import { LeafletMouseEvent } from 'leaflet';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField, minLength, required } from '@angular/forms/signals';

export interface reportData {
  type: string;
  description: string;
}

@Component({
  selector: 'app-report',
  imports: [LeafletMap, ReactiveFormsModule, FormField],
  templateUrl: './report.html',
  styleUrl: './report.scss',
})
export class Report {
  selectedFile = signal<File | null>(null);

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
    const file = event.target.files[0];
    if (file) {
      this.selectedFile.set(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('type', this.reportForm.type().value());
    formData.append('description', this.reportForm.description().value());

    const file = this.selectedFile();
    if (file) {
      formData.append('imageUrls', file, file.name);
    }
  }
}
