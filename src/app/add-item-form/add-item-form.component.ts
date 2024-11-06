import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-item-form.component.html',
  styleUrl: './add-item-form.component.css'
})
export class AddItemFormComponent {
  itemName: string = '';

  @Output() addItem = new EventEmitter<string>();
  itemForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      itemName: ['', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator]]
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.addItem.emit(this.itemForm.value.itemName);
      this.itemForm.reset();
    }
  }

  noWhitespaceValidator(control: any) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}