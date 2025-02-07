import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-add-drug',
  imports: [MatIcon, ReactiveFormsModule, CommonModule],
  templateUrl: './add-drug.component.html',
  styleUrl: './add-drug.component.css',
})
export class AddDrugComponent implements OnInit {
  addDrugForm!: FormGroup;
  qrCodeDataURL: string | null = null;
  qrCodeURL: string | null = null;
  dosageForms: string[] = [
    'Tablet',
    'Capsule',
    'Caplet',
    'Pill',
    'Lozenge',
    'Powder',
    'Granules',
    'Solution',
    'Suspension',
    'Syrup',
    'Elixir',
    'Tincture',
    'Cream',
    'Ointment',
    'Gel',
    'Paste',
    'Injection',
    'IV Infusion',
    'Inhaler',
    'Nebulizer Solution',
    'Nasal Spray',
    'Nasal Drops',
    'Patch',
    'Lotion',
    'Suppository',
    'Enema',
    'Eye Drops',
    'Ear Drops',
    'Buccal Tablet',
    'Sublingual Tablet',
  ];

  dosageScales: string[] = [
    'mcg', // Micrograms
    'mg', // Milligrams
    'g', // Grams
    'kg', // Kilograms
    'IU', // International Units
    'ml', // Milliliters
    'L', // Liters
    'mEq', // Milliequivalents
    'mmol', // Millimoles
    '%', // Percentage (for creams, ointments, solutions)
    'units', // Standard units (e.g., insulin)
    'puffs', // For inhalers
    'drops', // For eye/ear/nasal drops
    'tablets', // Number of tablets
    'capsules', // Number of capsules
    'suppositories', // Rectal/Vaginal dosage forms
    'sprays', // Number of sprays (nasal/oral)
    'ampoules', // Injectable dosage forms
    'vials', // Injectable dosage containers
    'patches', // For transdermal patches
    'hours', // For infusion rates (e.g., mg/hour)
    'ml/hour', // Infusion rates
    'mg/kg', // Weight-based dosing (e.g., per kg of body weight)
    'mcg/kg', // Microgram per kilogram
  ];

  constructor(private location: Location, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addDrugForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      priceValue: ['INR', Validators.required],
      manufacturer: ['', Validators.required],
      expiryDate: ['', Validators.required],
      dosage: ['Tablet', Validators.required],
      dosageScale: ['mg', Validators.required],
      dosageLevel: ['mg', Validators.required],
    });
  }

  back() {
    this.location.back();
  }

  payload() {
    return {
      drugName: this.addDrugForm.value.name,
      price:
        this.addDrugForm.value.price + ' ' + this.addDrugForm.value.priceValue,
      manufacturer: this.addDrugForm.value.manufacturer,
      expiryDate: this.addDrugForm.value.expiryDate,
      dosage:
        this.addDrugForm.value.dosageLevel +
        ' ' +
        this.addDrugForm.value.dosageScale +
        ' ' +
        this.addDrugForm.value.dosage,
    };
  }

  async addDrug() {
    const newDrug = this.payload();

    const qrCode = await QRCode.toDataURL(JSON.stringify(newDrug));

    console.log('--New Drug', { ...newDrug, qrCode });
    this.qrCodeDataURL = qrCode;

    // const dataSizeInKB = (qrCode.length * (3 / 4)) / 1024;
    // console.log(`QR Code Size: ~${dataSizeInKB.toFixed(2)} KB`);
  }

  get name() {
    return this.addDrugForm.get('name');
  }

  get price() {
    return this.addDrugForm.get('price');
  }

  get priceValue() {
    return this.addDrugForm.get('priceValue');
  }

  get manufacturer() {
    return this.addDrugForm.get('manufacturer');
  }

  get expiryDate() {
    return this.addDrugForm.get('expiryDate');
  }

  get dosage() {
    return this.addDrugForm.get('dosage');
  }

  get dosageLevel() {
    return this.addDrugForm.get('dosageLevel');
  }
}
