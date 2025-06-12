using SeniorLearnApi.Enums;

namespace SeniorLearnApi.DTOs.Responses;

public abstract class BulletinResponseBase
{
    public string Id { get; set; }
    public string Title { get; set; }

    public string Content { get; set; }
    public string CreatedById { get; set; }
    public string CreatedByUsername { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public MemberBulletinCategory Category { get; set; }
}