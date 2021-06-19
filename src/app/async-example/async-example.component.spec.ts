import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AsyncExampleComponent } from "./async-example.component";
import { DependencyService } from "../dependency/dependency.service";
import { of, throwError } from "rxjs";

describe("AsyncExampleComponent", () => {
  let component: AsyncExampleComponent;
  let fixture: ComponentFixture<AsyncExampleComponent>;

  const fakeDependencyService = jasmine.createSpyObj("fakeDepService", ["asyncExample", "observableExample"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsyncExampleComponent ],
      providers: [
        { provide: DependencyService, useValue: fakeDependencyService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });


});
