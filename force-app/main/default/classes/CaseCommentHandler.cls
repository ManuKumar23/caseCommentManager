
public with sharing class CaseCommentHandler {
    @AuraEnabled(cacheable = true)
    public static List<CaseComment> getCaseComments(String caseId){
        try {
            return [select 
            id,CommentBody,CreatedBy.name,CreatedDate 
            from CaseComment 
            where ParentId =: caseId 
            order by createdDate desc];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}