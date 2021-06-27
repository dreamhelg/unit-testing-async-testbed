import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { AsyncExampleComponent } from "./async-example.component";

describe("AsyncExampleComponent", () => {
  let component: AsyncExampleComponent;
  let fixture: ComponentFixture<AsyncExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsyncExampleComponent ],
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

  it("setNameWithPromise должен обновить имя в шаблоне - waitForAsync", waitForAsync(() => {
    component.setNameWithPromise("Ann");
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector("div");
      expect(el.textContent.trim()).toBe("Ann");
    });
  }));

  it("setNameAfterMinute должен присвоить указанное имя полю класса name - fakeAsync", fakeAsync(() => {
    component.setNameAfterMinute("Alice");
    tick(60000);
    expect(component.name).toBe("Alice");
  }));

  it("asyncExample должен вернуть указанное имя, спустя секунду - fakeAsync", fakeAsync(() => {
    component.asyncExample("Bob").then(res => {
      expect(res).toBe("Bob");
    });
    tick(1000);
  }));

  it("asyncExample должен вернуть указанное имя, спустя секунду - waitForAsync", waitForAsync(() => {
    component.asyncExample("Alice").then(res => {
      expect(res).toBe("Alice");
    });
  }));

  it("asyncExample должен вернуть реджект, если имя не указано - fakeAsync", fakeAsync(() => {
    component.asyncExample().then(null, err => {
      expect(err).toBe("имя не указано");
    });
    tick();
  }));

  it("promiseExample должен присвоить указанное имя полю класса - fakeAsync", fakeAsync(() => {
    component.promiseExample("Kate");
    tick(3000);
    expect(component.name).toBe("Kate");
  }));

  it("promiseExample должен вернуть реджект, при отсутствии имени - fakeAsync", fakeAsync(() => {
    component.promiseExample().then(null, err => {
      expect(err).toBe("нет имени");
    });
    tick(3000);
  }));

  it("observableExample должен вернуть observable с указанным именем - fakeAsync", fakeAsync(() => {
    component.observableExample("Bob").subscribe(res => {
      expect(res).toBe("Bob");
    });
    tick(1000);
  }));

  it("observableExample должен вернуть ошибку, при отсутствии имени - fakeAsync", fakeAsync(() => {
    component.observableExample().subscribe(null, err => {
      expect(err).toBe("нет имени");
    });
    tick(1000);
  }));
});
