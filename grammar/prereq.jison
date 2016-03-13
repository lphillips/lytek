/* description: Parses prerequisites for Lytek character
 *   generator for Exalted.
 */
 
/* lexical grammar */
 
%lex

%%
\s+                           /* skip whitespace */
"ABILITY"                     return 'ABILITY';
"ATTRIBUTE"                   return 'ATTRIBUTE';
"ESSENCE"                     return 'ESSENCE';
"CHARM"                       return 'CHARM';
"CHARM_COUNT"                 return 'CHARM_COUNT';
"("                           return '(';
")"                           return ')';
":"                           return ':';
"|"                           return 'OR';
"&"                           return 'AND';
[0-9]+                        return 'NUMBER';
[a-zA-Z]([0-9]|[a-zA-Z]|_)*   return 'ID';
<<EOF>>                       return 'EOF';

/lex

%%  /* language grammar */

prereq
  : prereq_stmt EOF
    { return $1; }
  ;
  
prereq_stmt
  : prereq_term AND prereq_term
    { $$ = new AndPrereq($1, $3); }
  | prereq_term OR prereq_term
    { $$ = new OrPrereq($1, $3); }
  | prereq_term
    { $$ = $1; }
  ;
  
prereq_term
  : ability_prereq
    { $$ = $1; }
  | attribute_prereq
    { $$ = $1; }
  | essence_prereq
    { $$ = $1; }
  | charm_prereq
    {}
  | charm_count_prereq
    {}
  | '(' prereq_stmt ')'
    { $$ = $2; }
  ;
  
  ability_prereq
    : 'ABILITY' ':' ID ':' NUMBER
      { $$ = new AbilityPrereq($3, parseInt($5)); }
    ;
    
  attribute_prereq
    : 'ATTRIBUTE' ':' ID ':' NUMBER
      { $$ = new AttributePrereq($3, parseInt($5)); }
    ;
    
  essence_prereq
    : 'ESSENCE' ':' NUMBER
      { $$ = new EssencePrereq(parseInt($3)); }
    ;
    
  charm_prereq
    : 'CHARM' ':' charm_list
      {}
    ;
    
  charm_list
    : ID
      {}
    | charm_list ',' ID
      {}
    ;
    
  charm_count_prereq
    : 'CHARM_COUNT' ':' ID ':' NUMBER
      {}
    ;
  
    
  