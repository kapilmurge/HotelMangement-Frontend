import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch } from '../../models/branch.model';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html'
})
export class BranchListComponent implements OnInit {

  branches: Branch[] = [];

  constructor(
    private branchService: BranchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.branchService.getAllBranches()
  .subscribe({
    next: (response) => {
      if (response.success) {
        this.branches = response.data;
      }
    },
    error: (err) => {
      console.error(err);
    }
  });
  }

  editBranch(id: number): void {
    this.router.navigate(['/admin/edit-branch', id]);
  }

  deleteBranch(id: number): void {

    const confirmDelete = confirm('Are you sure you want to delete this branch?');
    if (!confirmDelete) return;

    this.branchService.deleteBranch(id)
      .subscribe({
        next: () => {
          alert('Branch deleted successfully');
          this.loadBranches();
        },
        error: (err: Error) => {
          alert(err.message);
        }
      });
  }
}