import { LightningElement, api } from 'lwc';
import getCaseComments from '@salesforce/apex/CaseCommentHandler.getCaseComments';

export default class CaseCommentManager extends LightningElement {
    @api recordId;
    caseCommentData = [];
    commentCnt = 5;
    error;
    displayLoadMore = false;

    connectedCallback() {
        this.loadCaseComments();
    }

    async loadCaseComments() {
        try {
            const res = await getCaseComments({
                caseId: this.recordId,
                cnt: this.commentCnt + 1
            });

            this.caseCommentData = res.slice(0, this.commentCnt);
            console.log('Case comment array length : ', this.caseCommentData.length);
            this.displayLoadMore = res.length > this.commentCnt;
            console.log('case comment trigger component ', this.caseCommentData);
        } catch (e) {
            console.log(e.body);
        }
    }

    handleRefresh(){
        this.commentCnt = 5;
        this.displayLoadMore = false;
        this.loadCaseComments();
    }

    handleLoadMore() {
        this.commentCnt += 5;
        this.loadCaseComments();
    }
}