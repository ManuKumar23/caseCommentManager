
public with sharing class CaseCommentHandler {
    @AuraEnabled(cacheable = true)
    public static List<CaseComment> getCaseComments(String caseId,Integer cnt){
        try {
            return [select 
            id,CommentBody,CreatedBy.name,CreatedDate 
            from CaseComment 
            where ParentId =: caseId 
            order by createdDate desc limit :cnt];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}