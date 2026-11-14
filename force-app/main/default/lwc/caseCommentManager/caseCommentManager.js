import { LightningElement,api} from 'lwc';
import getCaseComments from '@salesforce/apex/CaseCommentHandler.getCaseComments';
export default class CaseCommentManager extends LightningElement {
    @api recordId;
    caseCommentData = [];
    error;
    connectedCallback(){
        this.loadCaseComments();
    }

    async loadCaseComments(){
        try{
            const res = await getCaseComments({caseId : this.recordId});
            this.caseCommentData = res;
            console.log('case comment trigger component ' , this.caseCommentData[0].CommentBody);
        }catch(error){
            console.log(e.body);
        }

    }
}