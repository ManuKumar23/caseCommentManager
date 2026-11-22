import { LightningElement,api} from 'lwc';
import getCaseComments from '@salesforce/apex/CaseCommentHandler.getCaseComments';
export default class CaseCommentManager extends LightningElement {
    @api recordId;
    caseCommentData = [];
    commentCnt = 5;
    error;
    connectedCallback(){
        this.loadCaseComments();
    }

    async loadCaseComments(){
        try{
            const res = await getCaseComments({caseId : this.recordId,cnt : this.commentCnt});
            this.caseCommentData = res;
            console.log('case comment trigger component ' , this.caseCommentData[0].CommentBody);
        }catch(e){
            console.log(e.body);
        }

    }

    handleLoadMore(){
        this.commentCnt += 5;
        this.loadCaseComments();
    }
}