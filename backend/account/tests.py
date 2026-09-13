import json

from django.contrib.auth import get_user_model
from django.test import TestCase


LOGIN_MUTATION = '''
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ok
    message
    user {
      id
      username
      email
      isSuperAdmin
    }
  }
}
'''

CURRENT_USER_QUERY = '''
query CurrentUser {
  currentUser {
    id
    username
    email
    isSuperAdmin
  }
}
'''


class GraphQLAuthTests(TestCase):
    def post_graphql(self, query, variables=None):
        return self.client.post(
            '/graphql/',
            data=json.dumps(
                {
                    'query': query,
                    'variables': variables or {},
                }
            ),
            content_type='application/json',
        )

    def test_current_user_returns_none_for_anonymous_user(self):
        response = self.post_graphql(CURRENT_USER_QUERY)

        self.assertEqual(response.status_code, 200)
        self.assertIsNone(response.json()['data']['currentUser'])

    def test_login_rejects_non_superuser_account(self):
        user_model = get_user_model()
        user_model.objects.create_user(username='member', password='secret123')

        response = self.post_graphql(
            LOGIN_MUTATION,
            {
                'username': 'member',
                'password': 'secret123',
            },
        )
        data = response.json()['data']['login']

        self.assertEqual(response.status_code, 200)
        self.assertFalse(data['ok'])
        self.assertIsNone(data['user'])

    def test_login_accepts_superuser_account(self):
        user_model = get_user_model()
        user_model.objects.create_superuser(
            username='superadmin',
            email='admin@example.com',
            password='secret123',
        )

        response = self.post_graphql(
            LOGIN_MUTATION,
            {
                'username': 'superadmin',
                'password': 'secret123',
            },
        )
        data = response.json()['data']['login']

        self.assertEqual(response.status_code, 200)
        self.assertTrue(data['ok'])
        self.assertEqual(data['user']['username'], 'superadmin')
        self.assertTrue(data['user']['isSuperAdmin'])
