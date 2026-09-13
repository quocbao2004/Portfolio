from django.contrib import admin

from .models import CurrentFocus, Profile, SocialLink


class SocialLinkInline(admin.TabularInline):
    model = SocialLink
    extra = 0


class CurrentFocusInline(admin.TabularInline):
    model = CurrentFocus
    extra = 0


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    inlines = [SocialLinkInline, CurrentFocusInline]
    list_display = ('full_name', 'headline', 'email', 'is_active', 'updated_at')
    list_filter = ('is_active',)
    search_fields = ('full_name', 'headline', 'email', 'location')


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('platform', 'profile', 'url', 'order', 'is_active')
    list_filter = ('is_active', 'platform')
    search_fields = ('platform', 'url', 'profile__full_name')


@admin.register(CurrentFocus)
class CurrentFocusAdmin(admin.ModelAdmin):
    list_display = ('title', 'profile', 'order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title', 'description', 'profile__full_name')
