import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from '../../models/branch.model';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html'
})
export class EditBranchComponent implements OnInit {

  branchId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private branchService: BranchService
  ) {}

  branchForm = this.fb.nonNullable.group({
    branchName: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    rating: [0, Validators.required],
    phone: ['', Validators.required],
    imgUrl: ['', Validators.required],
    hotelId: [0, Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  get f() {
    return this.branchForm.controls;
  }

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    this.branchId = Number(idParam);

    this.branchService.getBranchById(this.branchId)
      .subscribe({
        next: (branch: Branch) => {
          this.branchForm.patchValue(branch);
        },
        error: (err: Error) => {
          alert(err.message);
        }
      });
  }

 updateBranch(): void {

  if (this.branchForm.invalid) {
    this.branchForm.markAllAsTouched();
    return;
  }

  const updatedBranch: Branch = {
    id: this.branchId,
    ...this.branchForm.getRawValue()
  };

  this.branchService.updateBranch(updatedBranch)
    .subscribe({
      next: () => {
        alert('Branch updated successfully');
        this.router.navigate(['/admin/branches']);
      },
      error: (err: Error) => {
        alert(err.message);
      }
    });
}
}