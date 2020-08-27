import * as React from 'react';
import styles from './Addawptodoapp.module.scss';
import { IAddawptodoappProps } from './IAddawptodoappProps';
import * as strings from 'AddawptodoappWebPartStrings';
import { default as pnp, ListEnsureResult, ItemAddResult, Web, ReorderingRuleMatchType, RoleDefinitionBindings } from "sp-pnp-js";


export default class Addawptodoapp extends React.Component<IAddawptodoappProps, {}> {
  public state: IAddawptodoappProps;
  constructor(props, context) {
    super(props);
    this.state = {
      spHttpClient: this.props.spHttpClient,
      description: "",
      SiteUrl: this.props.SiteUrl,
      LibraryName: this.props.LibraryName,
      _items: [],
      FlagStageForBreadCrum: 0,
      TaskItem: '',
      TaskItemID: "",
    }
    this.OnchangeRemarks = this.OnchangeRemarks.bind(this);
    this.addingTask = this.addingTask.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  };
  public componentDidMount() {
    if (this.props.SiteUrl != null && this.props.SiteUrl != undefined) {
      this.checkList();
      this.bringTask();
    }
  }

  public checkList() {
    var NewISiteUrl = this.props.SiteUrl;//"https://mysite.sharepoint.com/sites/ATH";// this.props.SiteUrl;
    if (NewISiteUrl != null) {
      NewISiteUrl = NewISiteUrl.replace("/Pages", "");
      NewISiteUrl = NewISiteUrl.replace("/SitePages", "");
    }
    console.log("New Site Url" + NewISiteUrl);
    console.log("Props" + this.props.SiteUrl);

    let webx = new Web(NewISiteUrl);
    pnp.sp.web.lists.ensure("TodoList").then(function (finalResult) {
      console.log('Got the final result: ' + finalResult);

    });

  }
  public OnchangeRemarks(event: any): void {
    this.setState({ TaskItem: event.target.value });
  }
  public addingTask() {
    //Adding Activitites
    var NewISiteUrl = this.props.SiteUrl;//"https://mysite.sharepoint.com/sites/ATH";// this.props.SiteUrl;
    if (NewISiteUrl != null) {
      NewISiteUrl = NewISiteUrl.replace("/Pages", "");
      NewISiteUrl = NewISiteUrl.replace("/SitePages", "");
    }
    //console.log("New Site Url"+NewISiteUrl);
    // console.log("Props"+this.props.SiteUrl);
    let webx = new Web(NewISiteUrl);
    webx.lists.getByTitle("TodoList").items.add({
      Title: this.state.TaskItem, //Project Name
    }).then((response) => {
      console.log("Succes");
      this.bringTask();
    }).catch(error => {
      console.log(error);
    });

  }

  public updateStatus(id) {
    var NewISiteUrl = this.props.SiteUrl;//"https://mysite.sharepoint.com/sites/ATH";// this.props.SiteUrl;
    if (NewISiteUrl != null) {
      NewISiteUrl = NewISiteUrl.replace("/Pages", "");
      NewISiteUrl = NewISiteUrl.replace("/SitePages", "");
    }
    let webx = new Web(NewISiteUrl);
    webx.lists.getByTitle("TodoList").items.getById(id).update({
      Status: 0
    }).then(r => {
      this.bringTask();
    });

  }
  public handleRemove(id) {
    console.log(id);
    this.updateStatus(id);
   
  }




  public bringTask() {
    var NewISiteUrl = this.props.SiteUrl;//"https://mysite.sharepoint.com/sites/ATH";// this.props.SiteUrl;
    if (NewISiteUrl != null) {
      NewISiteUrl = NewISiteUrl.replace("/Pages", "");
      NewISiteUrl = NewISiteUrl.replace("/SitePages", "");
    }
    let webx = new Web(NewISiteUrl);
    var TempComplteDropDown = [];
    var tmpBalance = 0;
    var tmpBalanceDlvr = 0;
    var filteredarray = [];
    var TempTotalAmountForcasted = 0;
    webx.lists.getByTitle("TodoList").items.select('Title,ID')//.get().then((items: any[]) => {
      .filter("Status eq 1").get().then((items: any[]) => {
        var tempsArray = [];
        if (items.length > 0) {
          for (var i = 0; i < items.length; i++) {
            var Obj = {
              Title: items[i].Title,
              Id: items[i].ID
            }
            tempsArray.push(Obj);
          }
        }
        this.setState({
          _items: tempsArray
        });

      });

  }

  public render(): React.ReactElement<IAddawptodoappProps> {
    console.log(this.state._items);
    var Panelhtml = this.state._items.map((item, i) => {
      return (
        <div className={styles.column}>
          <div className={styles.itemrow}>
            <div className={styles.columnstitle}>
              {item["Title"]}
            </div>
            <div className={styles.columns}>
              <div className="fas fa-trash-alt icon trash-icon" id={item["Id"]} onClick={() => this.handleRemove(item["Id"])} >
              </div>
            </div>
          </div>
        </div>
      );
    },this);

    return (
      <div className={styles.addawptodoapp} >
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}> <input type="text" onChange={this.OnchangeRemarks.bind(this)} className={styles.clstxt} /></div>
            <div className={styles.column}> <input type="button" value={strings.Submitbtn} onClick={this.addingTask.bind(this)} className={styles.clsbtn} /></div>
          </div>
          <div className={styles.row}>
            <div  >{Panelhtml}</div>
          </div>
        </div>
      </div >
    );
  }
}
