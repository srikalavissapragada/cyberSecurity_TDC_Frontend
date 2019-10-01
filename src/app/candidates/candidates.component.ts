import { AfterViewInit, Component, OnInit, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CandidatesDataSource, CandidatesItem } from './candidates-datasource';
import { CandidateSanboxService } from "../upload-candidates/CandidateSanbox.service"
@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<CandidatesItem>;
  dataSource: MatTableDataSource<any>;

  constructor(private CandidateSanboxService: CandidateSanboxService, private cds: ChangeDetectorRef) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  allColumns = ["Emp_Name", "Emp_Sub_Unit", "EmpNo", "Emp_Mail_ID", "Emp_PU", "Emp_DU", "Emp_Base_Location", "Emp_Base_City", "Joining_Date_(Current_Legal_Entity)", "Role_Capability", "DU_Head_Name_for_Emp_DU", "Project_Code", "Master_Project_Code", "Project_Practice_Line", "Customer_Code", "Onsite/Offshore", "From_Date", "To_Date", "Allocated_Country", "Project_type", "Billing_Type", "Reporting_To_Mail_Id", "Proj_Remarks", "Project_DM_Name", "Total_Exp_in_Years", "Proj_DU_Code", "Project_DUHead_Name", "Project_SDM_MailId", "Job_Band", "JobBandSublevel", "JobBandcategory", "Personal_Band", "EmployeeCompany", "Talent_Status", "Employee_Bench_Type", "EmployeeSkills", "Deputee/Basehire", "Base_country", "Practice", "Portfolio", "Source", "Source_Quarter", "First_Production_Date", "TimetoDeploy", "TimetoDeployAgebucket", "DeploymentStatus", "Bench_Age", "BenchAgebucket", "Constraint_Category", "Constraint_Reason", "TotalNonProdAgedays", "nonprodagebucket", "ReasonforDelaycategory", "Last_Production_Date", "Forwardalloc", "Buffer_Month_Name", "Buffer_Month_No", "Buffer_Week_No", "Diff_Buffer", "Offer_Portfolio", "Offer_Account", "Hiring_Manager", "candidate_technology", "CurrMonPreprodVol", "Age", "Age_bucket", "Age_bucket2", "TMS_Talent_Status", "Cross_PL", "Emp_Unit", "Allocated_City", "Allocated_State", "Region", "Last_Master_Customer_Code", "Date_Upload", "ProjPu", "CoreEmployee", "WeekStartDate", "Month_Name", "365_Days_Ending_on", "18_Months_Ending_on", "CurrentQuarter"]

  displayedColumns = ['Emp_Name', 'Talent_Status', "EmployeeSkills", "Job_Band", "Emp_Base_Location", "Total_Exp_in_Years", "Reporting_To_Mail_Id"];

  skills = ["infrastructure ", 'cloud', 'siem', 'network', 'soc', 'information'].sort()
  locations = [];
  jobbands = [];
  skillvalue = "";
  locationValue = "";
  jobbandValue = "";

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.filterPredicate = (data, filter) => {
      const isTrue = true;
      if (this.skillvalue !== "") {
        if (data["EmployeeSkills"]) {
          let isMatching = (data["EmployeeSkills"].toLowerCase().indexOf(this.skillvalue.toLowerCase()) != -1);
          if (!isMatching) {
            return false;
          }
        }
        else {
          return false;
        }

      }
      if (this.locationValue !== "") {
        if (data["Emp_Base_Location"]) {

          let isMatching = (data["Emp_Base_Location"].toLowerCase().indexOf(this.locationValue.toLowerCase()) != -1);
          if (!isMatching) {
            return false;
          }
        }
        else {
          return false;
        }
      }
      if (this.jobbandValue !== "") {
        if (data["Job_Band"]) {

          let isMatching = (data["Job_Band"].toLowerCase().indexOf(this.jobbandValue.toLowerCase()) != -1);
          if (!isMatching) {
            return false;
          }
        }
        else {
          return false;
        }
      }
      return isTrue;
    }
    this.CandidateSanboxService.Candidates$.subscribe((data) => {
      this.dataSource.data = data;
      this.locations = [...new Set(data.filter(x => x['Job_Band']).map(x => x['Emp_Base_Location']))].sort();
      this.jobbands = [...new Set(data.filter(x => x['Job_Band']).map(x => x['Job_Band']))].sort()

    })
    this.CandidateSanboxService.getAllCandidates();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    // this.table.
  }
  filterskills(event) {
    this.dataSource.filter = event;
  }
}
