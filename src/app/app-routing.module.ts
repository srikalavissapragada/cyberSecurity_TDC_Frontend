import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadCandidatesComponent } from './upload-candidates/upload-candidates.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { SkillComponent } from './Skill/Skill.component';


const routes: Routes = [
  { path: "", component: UploadCandidatesComponent },
  {
    path: "upload", component: UploadCandidatesComponent
  }, {
    path: "benchlist", component: CandidatesComponent
  },
  {
    path: "SkillMatrix", component: SkillComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
