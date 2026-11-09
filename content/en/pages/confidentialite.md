<script setup>
import { SITE } from '../../../src/content/site'
</script>

## In short

This site sets no cookies and has no form. It measures its audience anonymously: there is no way to recognise you from one visit to the next.

## Audience measurement

To know which pages are read and how many CVs are downloaded, the site sends, for each page view or CV download, the page address and, when you arrive, the name of the site you came from. This information goes to Dashility, a measurement tool I host myself, on the same server as this site. It records neither your IP address, nor any identifier, nor any information about your browser. The data is kept for six months, then deleted.

## Server logs

Like any web server, the one hosting this site records technical logs: IP address, date and time, requested page. They are used only for the security and proper running of the site, and are kept for six months.

## If you write to me

Your email address and your message are used only to reply to you. They are neither shared nor used for any other purpose.

## Your rights

You can ask to access, correct or delete your data by writing to <a :href="`mailto:${SITE.email}`">{{ SITE.email }}</a>. You can also contact the CNIL, the French data protection authority.
